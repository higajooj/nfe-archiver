import { zodResolver } from "@hookform/resolvers/zod";
import ky from "ky";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  nfe: z.any(),
});

const NfeInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // TODO: handle wrong file types
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const file = values.nfe[0] as File;

        const formData = new FormData();
        formData.append("nfe", values.nfe[0]);

        const res = await ky.post("/api/nfe_upload", { body: formData });
        const resData = await res.text();
        toast.success(resData);
      })}
    >
      <div className="flex items-center gap-x-2 rounded bg-slate-50 p-1 shadow-lg">
        <input
          type="file"
          {...register("nfe", { required: true })}
          className="text-xs file:m-1 file:rounded-full file:border-none file:bg-green-300 file:px-2 file:py-1 file:text-xs file:hover:cursor-pointer file:hover:bg-green-400"
        />
        {errors.nfe && <span>required</span>}
        <button
          type="submit"
          className="rounded bg-sky-400 px-2 py-1 text-xs font-bold"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default NfeInput;
