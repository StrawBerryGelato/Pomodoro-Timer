import { useRef, useState } from 'react';

function ToDoList() {
  const [items, setItems] = useState([]);
  const inputRef = useRef(null);

  function addItem() {
    const value = inputRef.current.value.trim();
    if (!value) return;
    setItems(prev => [...prev, { id: Date.now(), text: value, done: false }]);
    inputRef.current.value = '';
  }


  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="buttons">

    {/* I was lazy with the CSS and just slapped on buttons and change the font color and size manually instead of doing it in the CSS file*/}
      <h2 style={{ color: 'white', fontSize: '30px' }}>To-Do List</h2>

      <input ref={inputRef} placeholder="Add a task..." style={{padding: "10px",border: "0px",borderRadius: "12px",fontSize: "16px",}}/>
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span style={{color: 'white', fontSize: '30px',backgroundColor: 'rgba(255,255,255,0.2)',padding: '8px 100px', borderRadius: '12px', }}>
              {item.text}
            </span >
            <button onClick={() => removeItem(item.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;