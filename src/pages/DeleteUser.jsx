import { useContext, useEffect, useState } from 'react';
import { GeneralLayout } from '../components';
import { UIContext } from '../context/ui';
import { FaTrash } from 'react-icons/fa';
import { MeContext, useToastState } from '../context';
import instance from '../api/instrance';

export const DeleteUser = () => {
  const me = useContext(MeContext);
  const { nazim, loading, setLoading, getNazim } = useContext(UIContext);
  const [data, setData] = useState(nazim);
  const [search, setSearch] = useState('');
  const { dispatch } = useToastState();
  const searchUsers = (e) => {
    setSearch(e.target.value);
    if (e.target.value && e.target.value !== '') {
      setData(nazim.filter((i) => i.email.includes(e.target.value)));
    } else {
      setData(nazim);
    }
  };
  useEffect(() => {
    setData(nazim);
  }, [nazim]);
  const deleteUser = async (user) => {
    setLoading(true);
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete ${user?.email}?`
      );
      if (isConfirmed) {
        const req = await instance.delete('/user/' + user?._id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        if (req) {
          await getNazim();
          dispatch({ type: 'SUCCESS', payload: req.data?.message });
        }
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
    setLoading(false);
  };
  return (
    <GeneralLayout title={'Delete Users'} active={"user-switch"}>
      <div className='p-5 relative flex flex-col items-center py-3 px-0 pt-0 justify-start h-[calc(100vh-65.6px-64px)]'>
        <div className='w-full overflow-x-auto'>
          <div className='flex items-center justify-center p-2'>
            <input
              type='search'
              name='Search'
              id='search'
              placeholder='Search User...'
              className='input input-bordered'
              value={search}
              onChange={searchUsers}
            />
          </div>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>
                  {localStorage.getItem('@type') === 'province'
                    ? 'Area'
                    : 'Halqa'}
                </th>
                <th>Status</th>
                <th className='text-center'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((i) => i?.userAreaId?._id !== me?.userAreaId?._id)
                .map((maqam, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{maqam?.name || '-'}</td>
                    <td>{maqam?.email || '-'}</td>
                    <td>{maqam?.userAreaId?.name || '-'}</td>
                    <td>
                      {!maqam?.isDeleted ? (
                        <div className='badge badge-accent'>active</div>
                      ) : (
                        <div className='badge badge-secondary'>deleted</div>
                      )}
                    </td>
                    <td className='flex justify-center items-center gap-4'>
                      <button
                        disabled={loading}
                        className='btn'
                        onClick={() => deleteUser(maqam)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </GeneralLayout>
  );
};
