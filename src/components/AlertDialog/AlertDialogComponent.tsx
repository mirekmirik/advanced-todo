import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogComponentProps {
  onSubmit: (arg?: any) => void;
  onCancel?: (arg?: any) => void;
  children: React.ReactNode;
}

export const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
  onCancel,
  onSubmit,
  children,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
          <AlertDialogDescription>
            Ця дія не може бути відновленна. Це назавжди видалить цей контент з
            вашого аккаунту і з наших серверів.
            {/* This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel?.()}>
            Скасувати
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit()}>
            Продовжити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
