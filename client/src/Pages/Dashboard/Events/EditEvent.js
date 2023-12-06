import React, { useState } from 'react';

const EditEvent = ({ selectedEvent, setShowEditEvent }) => {
  const [editedEvent, setEditedEvent] = useState(selectedEvent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleUpdateEvent = () => {
    // Logika untuk mengupdate event di database
    // Misalnya, panggil fungsi atau API untuk menyimpan perubahan event
    console.log('Menyimpan perubahan event ke database:', editedEvent);
    // Setelah update, kembalikan ke tampilan tabel event
    setShowEditEvent(false);
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form>
        <label>
          Nama Kegiatan:
          <input
            type="text"
            name="name"
            value={editedEvent.name}
            onChange={handleInputChange}
          />
        </label>
        {/* Tambahkan input fields lain untuk mengedit atribut event lainnya */}
        <button type="button" onClick={handleUpdateEvent}>
          Simpan Perubahan
        </button>
        <button type="button" onClick={() => setShowEditEvent(false)}>
          Batal
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
