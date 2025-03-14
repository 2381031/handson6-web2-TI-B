import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecipeFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, RecipeFormInput, unknown>;
  defaultInputData?: RecipeFormInput;
}

export type RecipeFormInput = {
  name: string;
  ingredients: string;
  instructions: string; 

};

const RecipeForm: React.FC<RecipeFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RecipeFormInput>();
  useEffect(() => {
    if (props.defaultInputData) {
      setValue("name", props.defaultInputData.name);
      setValue("ingredients", props.defaultInputData.ingredients);
      setValue("instructions", props.defaultInputData.instructions);
    }
  }, [props.defaultInputData]);
  const onSubmit: SubmitHandler<RecipeFormInput> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure want to update recipe ? ")) {
        return;
      }
    }
    props.mutateFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="name"
          className={
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
            (errors.name && "border-red-500")
          }
          placeholder="Recipe Title"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-red-600 text-xs italic" id="titleError">
           Name is required.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          {...register("ingredients", { required: true })}
          className={
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
            (errors.ingredients && "border-red-500")
          }
          rows={4}
          placeholder="Recipe ingredients"
          {...register("ingredients", { required: true })}
        ></textarea>

        {errors.ingredients && (
          <p className="text-red-600 text-xs italic" id="titleError">
           Ingredients are required.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Instruction
        </label>
        <textarea
          id="instructions"
          {...register("instructions", { required: true })}
          className={
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
            (errors.instructions && "border-red-500")
          }
          rows={4}
          placeholder="Recipe instructions"
          {...register("instructions", { required: true })}
        ></textarea>

        {errors.instructions && (
          <p className="text-red-600 text-xs italic" id="titleError">
           Instructions are required.
          </p>
        )}
      </div>

      

      <div className="flex items-center justify-between">
        {props.isEdit ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Recipe
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Recipe
          </button>
        )}
      </div>
    </form>
  );
};

export default RecipeForm;
