import { SelectContent, SelectTrigger, SelectValue , SelectItem , Select } from "@/components/ui/select";
import { Filter , Search } from "lucide-react";
import { Input } from "@/components/ui/input";


interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    category: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
  }
  
const SearchFilter = ({
    searchQuery,
    onSearchChange,
    category,
    onCategoryChange,
    sortBy,
    onSortChange,
}: SearchFilterProps) => {
    return (
        <div className="w-full animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full bg-background"
                    />
                </div>
  
                <div className="flex gap-2 md:w-auto w-full">
                    <Select value={category} onValueChange={onCategoryChange}>
                        <SelectTrigger  className="w-full md:w-[180px]">
                            <div className="flex items-center">
                                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="All Categories" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                        </SelectContent>
                    </Select>
  
                    <Select value={sortBy} onValueChange={onSortChange}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="alphabetical">Alphabetical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
  
export default SearchFilter;
  