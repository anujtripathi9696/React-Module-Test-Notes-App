import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewGroupPopup.css';

const NewGroupPopup = ({ onClose, onGroupCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF79F2');

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      onGroupCreate(groupName, selectedColor);
      onClose();
    }
  };

  return (
    <div className="popupBackground" onClick={onClose}>
      <div className="popupContainer" onClick={(e) => e.stopPropagation()}>
        <h2 className='popup-heading'>Create New Notes Group</h2>

        {/* Group Name */}
        <div className="inputGroup">
          <div className="labelGroup">
            <label>Group name</label>
          </div>
          <input
            type="text"
            placeholder="Enter your group name"
            className='popup-input'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <div className="colorLabelGroup">
            <label>Choose Color</label>
          </div>
          <div className="colorOptions">
            {['#FF79F2', '#B38BFA', '#43E6FC', '#F19576', '#0047FF', '#6691FF', '#FFC0C0'].map(
              (color, index) => (
                <div
                  key={index}
                  className={`colorOption ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></div>
              )
            )}
          </div>
        </div>

        <div className="buttonContainer">
  <button onClick={handleCreateGroup}>Create</button>
</div>


        <div className="groupName" style={{ color: '#000' }}>
          {groupName}
        </div>
      </div>
    </div>
  );
};

NewGroupPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGroupCreate: PropTypes.func.isRequired,
};

export default NewGroupPopup;
