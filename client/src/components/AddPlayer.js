import React, { useState } from 'react';

const AddPlayer = ({ addPlayer }) => {
  const [name, setName] = useState('');

  const onChange = e => {
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addPlayer(name);
    setName('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Add Player..."
        value={name}
        onChange={onChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPlayer;
