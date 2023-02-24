import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../types";
import { Category as api } from "../../../apis";

const categoryDefaultValues = {
  id: "",
  name: "",
};

export type ContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  category: Category | undefined;
  categories: Array<Category>;
  save: (category: Category) => void;
  delete: (id: string) => void;
  categorySelected: (category: Category) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const Context = React.createContext<ContextType>({
  status: "idle",
  isLoading: false,
  category: categoryDefaultValues,
  categories: [],
  save: () => {},
  delete: () => {},
  categorySelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<Category>(categoryDefaultValues);
  const [categories, setCategorys] = useState<Array<Category>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Category"],
    queryFn: api.getCategories,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createCategory,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Category"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editCategory,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Category"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteCategory,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Category"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      setCategorys(data);
    }
  }, [status, data]);

  const saveHandler = (category: Category) => {
    if (!category.id) {
      createMutation.mutate(category);
    } else {
      editMutation.mutate(category);
    }
    setCategory(categoryDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setCategory(categoryDefaultValues);
  };

  const categoryHandler = (category: Category) => {
    setCategory(category);
  };

  const resetHandler = () => {
    setCategory(categoryDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <Context.Provider
      value={{
        status: queryStatus,
        isLoading,
        category,
        categories,
        save: saveHandler,
        delete: deleteHandler,
        categorySelected: categoryHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
