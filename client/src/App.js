import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios.get('https://fishbone-server-4x24mbzw4q-nw.a.run.app/api/data')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fishbone-server-4x24mbzw4q-nw.a.run.app/api/data', formData)
      .then(response => {
        setData([...data, response.data]);
        setFormData({ name: '', age: '' });
      })
      .catch(error => console.error(error));
  }

  const handleView = (row) => {
    setSelectedRow(row);
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-4'>
      <h1 className='text-3xl font-bold mb-4'>Data Form</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <div className='mb-4'>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div className='mb-4'>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <button type="submit" className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>Add</button>
      </form>
      <h2 className='text-2xl font-bold mt-8 mb-4'>Data Table</h2>
      <table className='w-full max-w-2xl bg-white rounded-lg shadow-md'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='p-2'>Name</th>
            <th className='p-2'>Age</th>
            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className='border-b'>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.age}</td>
              <td className='p-2'>
                <button onClick={() => handleView(item)} className='bg-green-500 w-[100px] text-white py-1 rounded-lg hover:bg-green-700'>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow && (
        <div className='w-[400px] mt-20 pt-6 bg-white rounded-lg shadow-md text-center mb-20 pb-6'>
          <h2 className='text-2xl font-bold mb-2'>Selected Row Details</h2>
          <p>
            <span className='font-semibold pt-6'>Name:</span> {selectedRow.name}
          </p>
          <p>
            <span className='font-semibold pt-6'>Age:</span> {selectedRow.age}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
