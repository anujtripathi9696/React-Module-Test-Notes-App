import { useState } from 'react';
import PropTypes from 'prop-types';
import './NotesSection.css';
import sendBtn from './assets/Send-Btn.png';
import backBtn from './assets/BackArrow.png';

const NotesSection = ({ notes, activeGroup, handleNoteCreate, onBackButtonClick }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleSend = () => {
    handleNoteCreate(noteContent);
    setNoteContent('');
  };

  const handleBackButtonClick = () => {
    onBackButtonClick();
  };

  return (
    <div className="notesSection">
      <div className="groupHeader">
        <img
          src={backBtn}
          alt="Back"
          className="backButton"
          onClick={handleBackButtonClick}
        />
        <div className="gpIcon" style={{ backgroundColor: activeGroup.color }}>
          {activeGroup.name.slice(0, 2)}
        </div>
        <h2>{activeGroup.name}</h2>
      </div>

      <div className="notesContainer">
        {notes
          .filter((note) => note.group.name === activeGroup.name)
          .map((note) => (
            <div key={note.date} className="note">
              <div className="noteTimeDate">
                <div className="time">
                  {note.date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
                <div className="date">
                  {note.date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <div className="content">{note.content}</div>
            </div>
          ))}
      </div>

      <div className="noteInput">
        <textarea
          id="noteTextArea"
          placeholder="Enter your text here..........."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className="sendButton" onClick={handleSend}>
          <img src={sendBtn} alt="Send" />
        </button>
      </div>
    </div>
  );
};

NotesSection.propTypes = {
  notes: PropTypes.array.isRequired,
  activeGroup: PropTypes.object.isRequired,
  handleNoteCreate: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};

export default NotesSection;
