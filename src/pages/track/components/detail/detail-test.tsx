import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCountry } from "../../../../hooks/country";
import { TrackContext, TrackContextType } from "../../providers";
import { TrackType } from "../../types";

const Detail = () => {
  const { data: countries } = useCountry();
  const context = useContext<TrackContextType>(TrackContext);

  const { register, handleSubmit, reset } = useForm<TrackType>();

  const onSubmit: SubmitHandler<TrackType> = (data) => {
    context.save(data);
  };

  useEffect(() => {
    reset(context.track);
  }, [reset, context]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name")} />
      <label>Country:</label>
      <select {...register("country")}>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <label>State:</label>
      <input {...register("state")} />
      <label>City:</label>
      <input {...register("city")} />
      <button type="submit">Save</button>
    </form>
  );
};

export default Detail;
