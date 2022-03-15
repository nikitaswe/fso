import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    const filterText = event.target.value
    props.setFilter(filterText)
  }
  const clear = e => {
    const filter_input = document.getElementById('filter')
    filter_input.value = ''
    props.setFilter('')
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input id="filter" onChange={handleChange} />
      <button onClick={clear}>clear</button>
    </div>
  )
}

const ConnectedFilter = connect(null, { setFilter })(Filter)
export default ConnectedFilter
