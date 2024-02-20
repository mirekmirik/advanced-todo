import { MainNav } from "./MainNav";
import { Search } from "./Search";
import TeamSwitcher from "./TeamSwitcher";
import { UserNav } from "./UserNav";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Overview } from "./Overview";
import { RecentSales } from "./RecentSales";
import { Button } from "../ui/button";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import { useContextOutlet } from "@/routes/Root";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Task } from "@/types/tasks";

export default function Dashboard() {
  const {
    tasks: { tasks },
  } = useContextOutlet();

  const [updatedTasks, setUpdatedTasks] = useState<Task[]>(tasks);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const totalTasks = updatedTasks.length;
  const totalDoneTasks = updatedTasks.filter(
    (task) => task.status === "completed"
  );
  const totalTasksActive = updatedTasks.filter((task) => task.status === "new");
  const totalTasksCancelled = updatedTasks.filter(
    (task) => task.status === "cancelled"
  );

  const onFilterData = (date?: DateRange) => {
    const filteredTasks = tasks.filter((task) => {
      const taskCreatedAt = task.createdAt;
      const fromDate = date?.from || new Date();
      const toDate = date?.to || new Date();
      return taskCreatedAt >= fromDate && taskCreatedAt <= toDate;
    });
    setUpdatedTasks(filteredTasks);
  };

  return (
    <>
      {/* <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div> */}
      <div className="flex-col flex overflow-y-auto h-full">
        <div className="flex-1 space-y-4 px-4 py-6">
          <div className="flex items-center flex-col space-y-2 flex-wrap w-full">
            <h2 className="text-3xl font-bold tracking-tight">Графік</h2>
            <div className="flex items-center space-x-2 flex-wrap w-full gap-1">
              <CalendarDateRangePicker
                setDate={(data) => setDate(data)}
                date={date}
              />
              <Button onClick={() => onFilterData()} className="w-full !ml-0">
                Підтвердити
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 max-sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Усього задач
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalTasks}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Зроблено задач
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalDoneTasks.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Скасовано задач
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalTasksCancelled.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Активні задачі
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalTasksActive.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p> */}
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 max-sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview tasks={updatedTasks} date={date} />
                  </CardContent>
                </Card>
                <Card className="col-span-4  w-full">
                  <CardHeader>
                    <CardTitle>Нещодавні завдання</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales tasks={updatedTasks} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
