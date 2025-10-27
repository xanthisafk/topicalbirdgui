import Dropdown from "./ui/Dropdown/Dropdown";

const themes = [
  { value: 'mint', label: 'Mint Night' },
  { value: 'pastel', label: 'Pastel Dream' },
  { value: 'socialmedia', label: 'Social Media' },
  { value: 'red-velvet', label: 'Red Velvet' },
  { value: 'sky', label: 'Soaring Sky' },
  { value: 'midnight-purple', label: 'Midnight Purple' },
  { value: 'socialmedia-light', label: 'Social Media Light' },
  { value: 'mint-light', label: 'Mint Light' },
  { value: 'pastel-light', label: 'Pastel Light' },
  { value: 'coffee-light', label: 'Coffee Light' },
  { value: 'pride-light', label: 'Pride Light' },
  { value: 'sunburnt-light', label: 'Sunburnt Light' }
];

const ThemeSwitcher = ({ value, onChange }) => {
  return (
    <div className="theme-switcher">
      <Dropdown options={themes} value={value} onChange={onChange} />
    </div>
  );
};

export default ThemeSwitcher;