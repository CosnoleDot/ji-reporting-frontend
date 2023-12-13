import { useEffect, useState } from 'react';
import { useToastState } from '../../context';
import { Link, useLocation } from 'react-router-dom';
import instance from '../../api/instrance';
import { FaEdit } from 'react-icons/fa';

export const LocationMaqam = ({ me, setLoading0 }) => {
  const [provinces, setProvinces] = useState([]);
  const [maqams, setMaqams] = useState([]);
  const [halqas, setHalqas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useToastState();
  const [view, setView] = useState(
    ['province'].includes(localStorage.getItem('@type')) ? 'maqam' : 'halqa'
  );
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      if (queryParams.view) setView(queryParams.view);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  const [form, setForm] = useState({
    name: '',
    province: '',
  });
  const [formHalqa, setFormHalqa] = useState({
    name: '',
    parentId: '',
    parentType: 'Maqam',
  });
  const getProvinces = async () => {
    try {
      const req = await instance.get('/locations/province', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      setProvinces(req.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getMaqams = async () => {
    try {
      const req = await instance.get('/locations/maqam', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (localStorage.getItem('@type') === 'province') {
        setMaqams(req.data.data);
      } else if (localStorage.getItem('@type') === 'maqam') {
        setMaqams(
          [...req.data.data].filter((i) => i?._id === me?.userAreaId?._id)
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getHalqas = async () => {
    try {
      const req = await instance.get('/locations/halqa', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (localStorage.getItem('@type') === 'province') {
        setHalqas(req.data.data);
      } else if (localStorage.getItem('@type') === 'maqam') {
        setHalqas(
          [...req.data.data].filter(
            (i) => i?.parentId?._id === me?.userAreaId?._id
          )
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.post('/locations/maqam', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      setForm({
        name: '',
        province: '',
      });
      getMaqams();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitHalqa = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.post('/locations/halqa', formHalqa, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      setFormHalqa({
        name: '',
        parentId: '',
        parentType: 'Maqam',
      });
      getHalqas();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitEdit = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.put('/locations/maqam/' + id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      getMaqams();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitHalqaEdit = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.put('/locations/halqa/' + id, formHalqa, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      getHalqas();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const getAll = () => {
    setLoading0(true);
    getProvinces();
    getMaqams();
  };
  useEffect(() => {
    const fn = async () => {
      if (maqams.length > 0) {
        await getHalqas();
        setLoading0(false);
      }
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqams]);
  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  const handleDisable = (id, disabled) => {
    instance.patch(
      `/locations/${view}/disable-location/${id}`,
      { disabled },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
        },
      }
    );
  };
  return (
    <>
      <div
        className={`p-5 grid ${
          ['province'].includes(localStorage.getItem('@type'))
            ? 'grid-cols-2'
            : 'grid-cols-1'
        }`}
      >
        {['province'].includes(localStorage.getItem('@type')) && (
          <button
            className='btn'
            onClick={() => {
              setForm({
                name: '',
                province: '',
              });
              document.getElementById('add_maqam_modal').showModal();
              setEditMode(false);
            }}
          >
            Add Maqam
          </button>
        )}
        <button
          onClick={() => {
            setFormHalqa({
              name: '',
              parentId: '',
              parentType: 'Maqam',
            });
            document.getElementById('add_halqa_modal').showModal();
            setEditMode(false);
          }}
          className='btn ms-3'
        >
          Add Halqa
        </button>
      </div>

      <div role='tablist' className='w-full flex justify-between items-center'>
        {['province'].includes(localStorage.getItem('@type')) && (
          <Link
            to={'?active=maqam&view=maqam'}
            role='tab'
            className={`tab w-full ${view === 'maqam' ? 'tab-active' : ''}`}
          >
            Maqam
          </Link>
        )}
        <Link
          to={'?active=maqam&view=halqa'}
          role='tab'
          className={`tab w-full ${view === 'halqa' ? 'tab-active' : ''}`}
        >
          Halqa
        </Link>
      </div>
      {view === 'maqam' && (
        <div className='w-full overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Province</th>
                <th className='text-center'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {maqams.map((maqam, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{maqam?.name}</td>
                  <td>{maqam?.province?.name || '-'}</td>
                  <td className='flex justify-center items-center gap-4'>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(maqam?._id);
                        document.getElementById('add_maqam_modal').showModal();
                        setForm({
                          province: maqam?.province?._id || '',
                          name: maqam?.name || '',
                        });
                      }}
                      className='btn'
                    >
                      <FaEdit />
                    </button>
                    <input
                      type='checkbox'
                      className='toggle toggle-error'
                      defaultChecked={maqam?.disabled}
                      onChange={() => {
                        handleDisable(maqam?._id, !maqam?.disabled);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === 'halqa' && (
        <div className='w-full overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Maqam</th>
                <th className='text-center'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {halqas
                .filter((i) => i?.parentType === 'Maqam')
                .map((halqa, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{halqa?.name}</td>
                    <td>{halqa?.parentId?.name || '-'}</td>
                    <td className='flex  justify-center  items-center gap-4'>
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setId(halqa?._id);
                          document
                            .getElementById('add_halqa_modal')
                            .showModal();
                          setFormHalqa({
                            parentId: halqa?.parentId?._id || '',
                            name: halqa?.name || '',
                            parentType: 'Maqam',
                          });
                        }}
                        className='btn'
                      >
                        <FaEdit />
                      </button>
                      <input
                        type='checkbox'
                        className='toggle toggle-error'
                        defaultChecked={halqa?.disabled}
                        onChange={() => {
                          handleDisable(halqa?._id, !halqa?.disabled);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog id='add_maqam_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add Maqam</h3>
          <div className='space-y-4'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Province</span>
              </label>
              <select
                name='province'
                required
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className='w-full input input-bordered input-primary'
              >
                <option value='' disabled>
                  Select Province
                </option>
                {provinces
                  .filter((i) => !i?.disabled)
                  .map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Maqam</span>
              </label>
              <input
                name='name'
                type='text'
                placeholder='Enter Maqam Name'
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
          </div>
          <div className='modal-action'>
            {editMode ? (
              <button
                disabled={loading}
                className='btn'
                onClick={handleSubmitEdit}
              >
                Update
              </button>
            ) : (
              <button disabled={loading} className='btn' onClick={handleSubmit}>
                Add
              </button>
            )}
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={loading}
                id='close-maqam-modal'
                className='btn ms-3'
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id='add_halqa_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add Halqa</h3>
          <div className='space-y-4'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Maqam</span>
              </label>
              <select
                name='maqam'
                required
                value={formHalqa.parentId}
                onChange={(e) =>
                  setFormHalqa({ ...formHalqa, parentId: e.target.value })
                }
                className='w-full input input-bordered input-primary'
              >
                <option value='' disabled>
                  Select Maqam
                </option>
                {maqams
                  .filter((i) => !i?.disabled)
                  .map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Halqa</span>
              </label>
              <input
                name='name'
                type='text'
                placeholder='Enter Halqa Name'
                value={formHalqa.name}
                onChange={(e) =>
                  setFormHalqa({ ...formHalqa, name: e.target.value })
                }
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
          </div>
          <div className='modal-action'>
            {editMode ? (
              <button
                disabled={loading}
                className='btn'
                onClick={handleSubmitHalqaEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className='btn'
                onClick={handleSubmitHalqa}
              >
                Add
              </button>
            )}
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={loading}
                id='close-maqam-modal'
                className='btn ms-3'
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
