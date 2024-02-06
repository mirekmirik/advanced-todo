import * as React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useParams, useSearchParams } from "react-router-dom";
import { Status, statusesTabs } from "@/mock/statuses";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

export function StatusFilter() {
  const { statusTask } = useParams();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status>(
    statusesTabs.find((status) => status.value === statusTask) ||
      statusesTabs[0]
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeStatus = (status: Status | null) => {
    if (status) {
      setSelectedStatus(status);
      setOpen(false);
      return setSearchParams({
        status: status.value,
      });
    }
  };

  if (isDesktop) {
    return (
      <StatusListDekstop
        setSelectedStatus={onChangeStatus}
        value={selectedStatus.value}
        label={selectedStatus.label}
      />
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusListMobile
            setOpen={setOpen}
            label={selectedStatus.label}
            value={selectedStatus.value}
            setSelectedStatus={onChangeStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

//Mobile list
function StatusListMobile({
  setOpen,
  setSelectedStatus,
  value,
}: {
  value: string;
  label: string;
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>Не знайдено.</CommandEmpty>
        <CommandGroup>
          {statusesTabs.map((status) => (
            <CommandItem
              className={cn(value === status.value ? "bg-accent" : "")}
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statusesTabs.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
//Dekstop list
function StatusListDekstop({
  setSelectedStatus,
  value,
  label,
}: {
  value: string;
  label: string;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Фільтрувати по:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) =>
            setSelectedStatus(
              statusesTabs.find((priority) => priority.value === value) || null
            )
          }
        >
          {statusesTabs.map((status) => (
            <DropdownMenuRadioItem key={status.value} value={status.value}>
              {status.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    // <Command>
    //   <CommandInput placeholder="Filter status..." />
    //   <CommandList>
    //     <CommandEmpty>Не знайдено</CommandEmpty>
    //     <CommandGroup>
    //       {statusesTabs.map((status) => (
    //         <CommandItem
    //           key={status.value}
    //           value={status.value}

    //           onSelect={(value) => {
    //             setSelectedStatus(
    //               statusesTabs.find((priority) => priority.value === value)!
    //             );
    //           }}
    //         >
    //           {status.label}
    //         </CommandItem>
    //       ))}
    //     </CommandGroup>
    //   </CommandList>
    // </Command>
  );
}

// <Popover open={open} onOpenChange={setOpen}>
//   <PopoverTrigger asChild>
//     <Button variant={"outline"} className="w-[150px] justify-start">
//       {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
//     </Button>
//     {/* <StatusList
//      /> */}

//     {/* <Button variant="outline" className="w-[150px] justify-start">
//       {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
//     </Button> */}
//   </PopoverTrigger>
//   <PopoverContent className="w-[200px] p-0" align="start">
//     <StatusList setOpen={setOpen} setSelectedStatus={onChangeStatus} />
//   </PopoverContent>
// </Popover>
