import './chatSearch.css';

import SearchOutlinedIcon from '../../assets/svg-icons/SearchOutlinedIcon';

export default function ChatSearch({ search, onSearch }) {
  return (
    <div className="chat-search_container">
      <SearchOutlinedIcon clsName="chat-search_icon" size="16px" />
      <input
        onChange={e => onSearch(e.target.value)}
        value={search}
        className="chat-search"
        type="text"
        placeholder="Search chats..."
      />
    </div>
  );
}
