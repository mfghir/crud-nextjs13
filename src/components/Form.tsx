import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must have more length'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phone: Yup.string().required('Phone is required').matches(/^09\d{2}\d{3}\d{4}$/, 'Please enter a valid Iranian phone number formatted as 09XX XXXX XXX')
});

type FormData = {
  name: string,
  email: string,
  phone: string
}

type Props = {
  user: FormData;
  setUser: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<Props> = ({ user, setUser, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form className='flex flex-col justify-start gap-y-4 w-full md:w-80 backdrop-blur-sm bg-white/30 p-4 rounded-lg'
      onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        {...register('name')}
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Name'
        name='name'
        value={user.name}
        onChange={changeHandler}
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message}</p>
      )}
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        {...register('email')}
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Email'
        name='email'
        value={user.email}
        onChange={changeHandler}
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}
      <br />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        {...register('phone')}
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Phone'
        name="phone"
        value={user.phone}
        onChange={changeHandler}
      />
      {errors.phone && (
        <p className="text-red-500">{errors.phone.message}</p>
      )}
      <br />

      <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'>
        Create Item
      </button>
    </form>
  );
};

export default Form;
