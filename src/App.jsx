import { useState, useEffect } from 'react';
import NewGroupPopup from './NewGroup/NewGroupPopup';
import NotesSection from './NotesSection';
import './App.css';
import myimage from './assets/intro-img.png';
import lockImage from './assets/Lock-img.png';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false); // Add this line

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    let storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    storedNotes = storedNotes.map((note) => ({ ...note, date: new Date(note.date) }));

    setGroups(storedGroups);
    setNotes(storedNotes);
  }, []);

  const handleNoteCreate = (noteContent) => {
    if (activeGroup && noteContent) {
      const newNote = { group: activeGroup, content: noteContent, date: new Date() };
      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      console.log('New notes state:', newNotes); // Add this line
      saveToLocalStorage('notes', newNotes);
    }
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleGroupCreate = (groupName, color) => {
    const newGroup = { name: groupName, color: color };
    const newGroups = [...groups, newGroup];
    setGroups(newGroups);
    saveToLocalStorage('groups', newGroups);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setGroups([]);
    setNotes([]);
    setActiveGroup(null);
  };

  const handleBackButtonClick = () => {
    setActiveGroup(null);
    setIsNotesVisible(false); // Add this line
  };

  return (
    <div className="app">
      <div className={`leftSection ${isNotesVisible ? 'hidden' : ''}`}>
        <div className="topLeftSection">
          <h1 className="heading">Pocket Notes</h1>
          <button className="notesBtn" onClick={togglePopup}>
            <span className="plusSpan">+</span>Create Notes Group
          </button>
        </div>

        {isPopupVisible && <NewGroupPopup onClose={togglePopup} onGroupCreate={handleGroupCreate} />}

        <button className="clearLocalStorageBtn" onClick={clearLocalStorage}>
          Clear
        </button>

        <div className="groupContainer">
          {groups.map((group, index) => (
            <button
              key={index}
              className={`groupBtn ${group === activeGroup ? 'active' : ''}`}
              onClick={() => {
                setActiveGroup(group);
                setIsNotesVisible(true); // Add this line
              }}
            >
              <div className="groupIcon" style={{ backgroundColor: group.color }}>
                {group.name && group.name.slice(0, 2)}
              </div>
              <div className="groupName" style={{ color: '#000' }}>
                {group.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeGroup && isNotesVisible ? ( // Modify this line
        <NotesSection
          activeGroup={activeGroup}
          notes={notes}
          handleNoteCreate={handleNoteCreate}
          onBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div className={`rightSection ${isNotesVisible ? 'hidden' : ''}`}>
          <div className="centerContent">
            <img src={myimage} className="intro-image" alt="Pocket Notes" />
            <h1>POCKET NOTES</h1>
            <p>
              Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices
              and 1 mobile phone.
            </p>
          </div>
          <div className="encryption">
            <img src={lockImage} alt="Lock" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
