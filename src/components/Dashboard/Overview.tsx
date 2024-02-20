import { Task, TaskStatus } from "@/types/tasks";
import { getDay } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface OverviewProps {
  tasks: Task[];
  date?: DateRange;
}

export function Overview({ tasks, date }: OverviewProps) {

  const getCompletedTasksByMonth = (
    tasks: Task[],
    type: TaskStatus = "new"
  ) => {
    const currentYear = new Date().getFullYear();
    const data = months.map((month) => {
      const monthTasks = tasks.filter((task) => {
        const taskCreatedAt = new Date(task.createdAt);
        return (
          taskCreatedAt.getMonth() === months.indexOf(month) &&
          taskCreatedAt.getFullYear() === currentYear
        );
      });
      const newTasks = monthTasks.filter((task) => task.status === "new");
      const completedTasks = monthTasks.filter(
        (task) => task.status === "completed"
      );
      const cancelledTasks = monthTasks.filter(
        (task) => task.status === "cancelled"
      );

      return {
        name: month,
        new: newTasks.length,
        completed: completedTasks.length,
        cancelled: cancelledTasks.length,
      };
    });

    return data;
  };

  const getNewTasksByDay = (tasks: Task[], dateRange: DateRange) => {
    const { from: dateFrom, to: dateTo } = dateRange;
    if (!dateFrom) return;

    const days = [];

    // Получить все дни между dateFrom и dateTo
    for (
      let currentDate = new Date(dateFrom);
      currentDate <= (dateTo || new Date());
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const day = {
        name: currentDate.toLocaleDateString(),
        total: 0,
        new: 0,
        completed: 0,
        cancelled: 0,
      };

      // Отфильтровать задачи для текущего дня
      const dayTasks = tasks.filter((task) => {
        const taskCreatedAt = new Date(task.createdAt);
        return (
          taskCreatedAt.getDate() === currentDate.getDate() &&
          taskCreatedAt.getMonth() === currentDate.getMonth() &&
          taskCreatedAt.getFullYear() === currentDate.getFullYear()
        );
      });

      const newTasks = dayTasks.filter((task) => task.status === "new");
      const completedTasks = dayTasks.filter(
        (task) => task.status === "completed"
      );
      const cancelledTasks = dayTasks.filter(
        (task) => task.status === "cancelled"
      );

      day.total = dayTasks.length;
      day.completed = completedTasks.length;
      day.new = newTasks.length;
      day.cancelled = cancelledTasks.length;

      days.push(day);
    }
    return days;
  };

  const getData = () => {
    return !!date && !!date.from
      ? getNewTasksByDay(tasks, date)
      : getCompletedTasksByMonth(tasks);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={getData()}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Legend />
        <Line
          type={"monotone"}
          dataKey="new"
          stroke="grey"
          className="fill-primary"
        />
        <Line
          type={"monotone"}
          dataKey="completed"
          // fill="green"
          stroke="#1eb656"
          className="fill-primary"
        />
        <Line
          type={"monotone"}
          dataKey="cancelled"
          fill="currentColor"
          stroke="red"
          className="fill-primary"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
