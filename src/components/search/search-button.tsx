import Button from '@/components/ui/button';
import { SearchIcon } from '@/components/icons/search-icon';
import { useSearch } from '@/components/search/search-view';

export default function SearchButton({
  className = 'flex',
}: {
  className?: string;
}) {
  const { openSearch } = useSearch();
  return (
    <Button
      variant="icon"
      aria-label="Search"
      className={className}
      onClick={openSearch}
    >
      <SearchIcon className="h-9 w-9 p-2 bg-white border border-pink-5 rounded-md w-10 h-10 flex items-center justify-center  hover:bg-pink-50 transition group-hover:scale-110" />
    </Button>
  );
}
