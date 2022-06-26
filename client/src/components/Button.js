import PropTypes from 'prop-types';

function Button({ text }) {
  return <button className="btn mx-auto" style={buttonStyle}> {text} </button>
  
}

const buttonStyle = {
  display: 'block',
  backgroundColor: 'rgb(191, 78, 113)',
  color: '#fff'
}

Button.propTypes = {
  text: PropTypes.string
}
export default Button