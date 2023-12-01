import { useState } from 'react';
import { GeneralLayout, Loader } from '../components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import instance from '../api/instrance';
import { useToastState } from '../context';
import { FaEdit } from 'react-icons/fa';

const Maqam = ({ me, setLoading0 }) => {
  const [provinces, setProvinces] = useState([]);
  const [maqams, setMaqams] = useState([]);
  const [halqas, setHalqas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useToastState();
  const [view, setView] = useState('maqam');
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      setView(queryParams.view);
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
          [...req.data.data].filter(
            (i) => i?._id === me?.userAreaId?._iduserAreaId?._id
          )
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
            (i) => i?.parentId?._id === me?.userAreaId?._iduserAreaId?._id
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
  const getAll = async () => {
    setLoading0(true);
    await getProvinces();
    await getMaqams();
    await getHalqas();
    setLoading0(false);
  };
  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  return (
    <>
      <div>
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
            className={`tab w-full ${
              view === 'maqam' ? 'tab-view bg-slate-200' : ''
            }`}
          >
            Maqam
          </Link>
        )}
        <Link
          to={'?active=maqam&view=halqa'}
          role='tab'
          className={`tab w-full ${
            view === 'halqa' ? 'tab-view bg-slate-200' : ''
          }`}
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {maqams.map((maqam, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{maqam?.name}</td>
                  <td>{maqam?.province?.name || '-'}</td>
                  <td>
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
                <th>Edit</th>
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
                    <td>
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
                {provinces.map((i, index) => (
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
                {maqams.map((i, index) => (
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

const Division = ({ me, setLoading0 }) => {
  const [provinces, setProvinces] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [halqas, setHalqas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useToastState();
  const [view, setView] = useState('division');
  const [validHalqa, setValidHalqas] = useState([]);
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      setView(queryParams.view);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  const [form, setForm] = useState({
    name: '',
    province: '',
  });
  const [formDistrict, setFormDistrict] = useState({
    name: '',
    division: '',
  });
  const [formTehsil, setFormTehsil] = useState({
    name: '',
    district: '',
  });
  const [formHalqa, setFormHalqa] = useState({
    name: '',
    parentId: '',
    parentType: 'Tehsil',
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
  const getTehsils = async () => {
    try {
      const req = await instance.get('/locations/tehsil', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (localStorage.getItem('@type') === 'province') {
        setTehsils(req.data.data);
      } else if (localStorage.getItem('@type') === 'division') {
        setTehsils(
          [...req.data.data].filter(
            (i) => i?.district?.division?._id === me?.userAreaId?._id
          )
        );
        setValidHalqas(
          [...req.data.data]
            .filter((i) => i?.district?.division?._id === me?.userAreaId?._id)
            .map((i) => i?._id.toString())
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getDivisions = async () => {
    try {
      const req = await instance.get('/locations/division', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (localStorage.getItem('@type') === 'province') {
        setDivisions(req.data.data);
      } else if (localStorage.getItem('@type') === 'division') {
        setDivisions(
          req.data.data.filter((i) => i?._id === me?.userAreaId?._id)
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getDistricts = async () => {
    try {
      const req = await instance.get('/locations/district', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (localStorage.getItem('@type') === 'province') {
        setDistricts(req.data.data);
      } else if (localStorage.getItem('@type') === 'division') {
        setDistricts(
          [...req.data.data].filter(
            (i) => i?.division?._id === me?.userAreaId?._id
          )
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
      } else if (localStorage.getItem('@type') === 'division') {
        setHalqas(
          [...req.data.data].filter((i) => validHalqa.includes(i?.parentId?._id.toString()))
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
      const req = await instance.post('/locations/division', form, {
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
      getDivisions();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitDistrict = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.post('/locations/district', formDistrict, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      setFormDistrict({
        name: '',
        division: '',
      });
      getDistricts();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitTehsil = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.post('/locations/tehsil', formTehsil, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      setFormTehsil({
        name: '',
        district: '',
      });
      getTehsils();
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
        parentType: 'Tehsil',
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
      const req = await instance.put('/locations/division/' + id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      getDivisions();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitDistrictEdit = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.put(
        '/locations/district/' + id,
        formDistrict,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      getDistricts();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
    setLoading0(false);
  };
  const handleSubmitTehsilEdit = async () => {
    setLoading(true);
    setLoading0(true);
    try {
      const req = await instance.put('/locations/tehsil/' + id, formTehsil, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      getTehsils();
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
  const getAll = async () => {
    setLoading0(true);
    await getProvinces();
    await getDivisions();
    await getHalqas();
    await getTehsils();
    await getDistricts();
    setLoading0(false);
  };
  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {['province'].includes(localStorage.getItem('@type')) && (
          <button
            className='btn mb-3'
            onClick={() => {
              setForm({
                name: '',
                province: '',
              });
              document.getElementById('add_division_modal').showModal();
              setEditMode(false);
            }}
          >
            Add Division
          </button>
        )}
        <button
          className='btn mb-3 ms-3'
          onClick={() => {
            setFormDistrict({
              name: '',
              division: '',
            });
            document.getElementById('add_district_modal').showModal();
            setEditMode(false);
          }}
        >
          Add District
        </button>
        <button
          className='btn mb-3 ms-3'
          onClick={() => {
            setFormTehsil({
              name: '',
              district: '',
            });
            document.getElementById('add_tehsil_modal').showModal();
            setEditMode(false);
          }}
        >
          Add Tehsil
        </button>
        <button
          onClick={() => {
            setFormHalqa({
              name: '',
              parentId: '',
              parentType: 'Tehsil',
            });
            document.getElementById('add_halqa_modal').showModal();
            setEditMode(false);
          }}
          className='btn mb-3 ms-3'
        >
          Add Halqa
        </button>
      </div>

      <div role='tablist' className='w-full flex justify-between items-center'>
        {['province'].includes(localStorage.getItem('@type')) && (
          <Link
            to={'?active=division&view=division'}
            role='tab'
            className={`tab w-full ${
              view === 'division' ? 'tab-view bg-slate-200' : ''
            }`}
          >
            Division
          </Link>
        )}
        <Link
          to={'?active=division&view=district'}
          role='tab'
          className={`tab w-full ${
            view === 'district' ? 'tab-view bg-slate-200' : ''
          }`}
        >
          District
        </Link>
        <Link
          to={'?active=division&view=tehsil'}
          role='tab'
          className={`tab w-full ${
            view === 'tehsil' ? 'tab-view bg-slate-200' : ''
          }`}
        >
          Tehsil
        </Link>
        <Link
          to={'?active=division&view=halqa'}
          role='tab'
          className={`tab w-full ${
            view === 'halqa' ? 'tab-view bg-slate-200' : ''
          }`}
        >
          Halqa
        </Link>
      </div>
      {view === 'division' && (
        <div className='w-full overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Province</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((division, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{division?.name}</td>
                  <td>{division?.province?.name || '-'}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(division?._id);
                        document
                          .getElementById('add_division_modal')
                          .showModal();
                        setForm({
                          province: division?.province?._id || '',
                          name: division?.name || '',
                        });
                      }}
                      className='btn'
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === 'tehsil' && (
        <div className='w-full overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>District</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {tehsils.map((tehsil, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{tehsil?.name}</td>
                  <td>{tehsil?.district?.name || '-'}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(tehsil?._id);
                        document.getElementById('add_tehsil_modal').showModal();
                        setFormTehsil({
                          district: tehsil?.district?._id || '',
                          name: tehsil?.name || '',
                        });
                      }}
                      className='btn'
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === 'district' && (
        <div className='w-full overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Division</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((district, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{district?.name}</td>
                  <td>{district?.division?.name || '-'}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(district?._id);
                        document
                          .getElementById('add_district_modal')
                          .showModal();
                        setFormDistrict({
                          district: district?.division?._id || '',
                          name: district?.name || '',
                        });
                      }}
                      className='btn'
                    >
                      <FaEdit />
                    </button>
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
                <th>Tehsil</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {halqas
                .filter((i) => i?.parentType === 'Tehsil')
                .map((halqa, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{halqa?.name}</td>
                    <td>{halqa?.parentId?.name || '-'}</td>
                    <td>
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
                            parentType: 'Tehsil',
                          });
                        }}
                        className='btn'
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog id='add_division_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add Division</h3>
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
                {provinces.map((i, index) => (
                  <option value={i?._id} key={index}>
                    {i?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Division</span>
              </label>
              <input
                name='name'
                type='text'
                placeholder='Enter Division Name'
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
                id='close-division-modal'
                className='btn ms-3'
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id='add_district_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add District</h3>
          <div className='space-y-4'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Division</span>
              </label>
              <select
                name='division'
                required
                value={formDistrict.division}
                onChange={(e) =>
                  setFormDistrict({ ...formDistrict, division: e.target.value })
                }
                className='w-full input input-bordered input-primary'
              >
                <option value='' disabled>
                  Select Division
                </option>
                {divisions.map((i, index) => (
                  <option value={i?._id} key={index}>
                    {i?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Name</span>
              </label>
              <input
                name='name'
                type='text'
                placeholder='Enter District Name'
                value={formDistrict.name}
                onChange={(e) =>
                  setFormDistrict({ ...formDistrict, name: e.target.value })
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
                onClick={handleSubmitDistrictEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className='btn'
                onClick={handleSubmitDistrict}
              >
                Add
              </button>
            )}
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={loading}
                id='close-district-modal'
                className='btn ms-3'
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id='add_tehsil_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add Tehsil</h3>
          <div className='space-y-4'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>District</span>
              </label>
              <select
                name='district'
                required
                value={formTehsil.district}
                onChange={(e) =>
                  setFormTehsil({ ...formTehsil, district: e.target.value })
                }
                className='w-full input input-bordered input-primary'
              >
                <option value='' disabled>
                  Select District
                </option>
                {districts.map((i, index) => (
                  <option value={i?._id} key={index}>
                    {i?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Name</span>
              </label>
              <input
                name='name'
                type='text'
                placeholder='Enter Tehsil Name'
                value={formTehsil.name}
                onChange={(e) =>
                  setFormTehsil({ ...formTehsil, name: e.target.value })
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
                onClick={handleSubmitTehsilEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className='btn'
                onClick={handleSubmitTehsil}
              >
                Add
              </button>
            )}
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={loading}
                id='close-tehsil-modal'
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
                <span className='text-base label-text'>Tehsil</span>
              </label>
              <select
                name='parentId'
                required
                value={formHalqa.parentId}
                onChange={(e) =>
                  setFormHalqa({ ...formHalqa, parentId: e.target.value })
                }
                className='w-full input input-bordered input-primary'
              >
                <option value='' disabled>
                  Select Tehsil
                </option>
                {tehsils.map((i, index) => (
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
                id='close-division-modal'
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

export const Locations = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('maqam');
  const [me, setMe] = useState({});
  const params = useLocation();
  const { dispatch } = useToastState();
  const getMe = async () => {
    try {
      const req = await instance.get('/user/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      setMe(req.data.data);
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
  };
  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      setActive(queryParams.active);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  return (
    <GeneralLayout title='Locations' active={'locations'}>
      <div className='relative flex flex-col items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]'>
        <div
          role='tablist'
          className='w-full flex justify-between items-center'
        >
          {['province', 'maqam'].includes(localStorage.getItem('@type')) && (
            <Link
              to={'?active=maqam'}
              role='tab'
              className={`tab w-full ${
                active === 'maqam' ? 'tab-active bg-slate-200' : ''
              }`}
            >
              Maqam
            </Link>
          )}
          {['province', 'division'].includes(localStorage.getItem('@type')) && (
            <Link
              to={'?active=division'}
              role='tab'
              className={`tab w-full ${
                active === 'division' ? 'tab-active bg-slate-200' : ''
              }`}
            >
              Division
            </Link>
          )}
        </div>
        <div className='relative w-full flex flex-col gap-3 items-center p-5 justify-start h-[calc(100vh-65.6px-64px-32px)]'>
          {active === 'maqam' && <Maqam me={me} setLoading0={setLoading} />}
          {active === 'division' && (
            <Division me={me} setLoading0={setLoading} />
          )}
        </div>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
