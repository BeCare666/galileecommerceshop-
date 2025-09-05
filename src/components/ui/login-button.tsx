import { UserIcon } from '@/components/icons/user-icon';
import { useModalAction } from '@/components/modal-views/context';
import AuthorizedMenu from '@/components/ui/auth-menu';
import Button from '@/components/ui/button';
import { useMe } from '@/data/user';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

export default function LoginMenu() {
  const { openModal } = useModalAction();
  const { me, isAuthorized, isLoading } = useMe();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full from-pink-400 to-indigo-400 text-light-100 dark:bg-dark-500" />
    );
  }
  if (isAuthorized && me && !isLoading) {
    return <AuthorizedMenu user={me} />;
  }
  return (
    <Button
      variant="icon"
      aria-label="User"
      className="flex tr from-pink-400 to-indigo-400  rounded-full h-9 w-9"
      onClick={() => openModal('LOGIN_VIEW')}
    >
      <UserIcon className="h-8 w-8 text-white" />
    </Button>
  );
}
