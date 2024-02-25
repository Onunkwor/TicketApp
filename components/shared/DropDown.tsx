import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropDownProps = {
  onChange: () => void;
  value?: string;
};
const DropDown = ({ onChange, value }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const handleAddCategory = () => {
     createCategory({
        categoryName: newCategory.trim()
     }).then((category) =>{
        setCategories((prevState) => [...prevState,category])
     })
  };
  useEffect(()=>{
    const getCategories = async () => {
      const categoryList = await getAllCategories(); 
      categoryList && setCategories(categoryList as ICategory[]); 
    }
    getCategories()
  },[])
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <SelectItem
              value={category._id}
              key={index}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <Dialog>
          <DialogTrigger className="w-full p-medium-14 rounded-sm py-3 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add Event Category
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
              <DialogDescription>
                <Input
                  type="text"
                  placeholder="Category Name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SelectContent>
    </Select>
  );
};

export default DropDown;
