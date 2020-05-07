import React from 'react'
import ReactPaginate from 'react-paginate'
import { Table } from './component/Table/Table'
import { Loader } from './component/Loader/Loader'
import { PersonInfo } from './component/PersonInfo/PersonInfo'
import { ChooseCount } from './component/ChooseCount/ChooseCount'
import { Search } from './component/Search/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import _ from 'lodash'

export default class App extends React.Component{
  state = {
    data: [],
    loading: false,
    defaultOrder: 'id',
    sort: 'desc',
    detailedRow: null,
    chosenCount: false,
    currentPage: 0,
    search: ''
  }

  async fetchPeople(amount) {
    const response = await fetch(`http://www.filltext.com/?rows=${amount}&id={number|1000}&fname={firstName}&lname={lastName}&tel={phone|format}&address={addressObject}&city={city}&state={usState|abbr}&zip={zip}&pretty=true`)

    const data = await response.json()
    
    this.setState({data, loading: false})
    this.sortHandler(this.state.defaultOrder)
  }

  sortHandler = order => {
    const clonedData = this.state.data.concat()
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'

    const sortedData = _.orderBy(clonedData, order, sortType)
    this.setState({
      data: sortedData,
      sort: sortType
    })
  }

  showInfo = person => {
    this.setState({detailedRow: person})
  }

  modeHandler = count => {
    this.setState({ 
      chosenCount: true,
      loading: true
    })

    this.fetchPeople(count)
  }

  handleSearch = value => {
    this.setState({search: value, currentPage: 0})
  }

  getFilteredData = () => {
    const {data, search} = this.state
    
    if(!search) {
      return data
    }

    return data.filter(item => {
      return item['fname'].toLowerCase().includes(search.toLowerCase()) ||
      item['lname'].toLowerCase().includes(search.toLowerCase())
    })
  }

  handlePageClick = ({selected}) => {
    this.setState({currentPage: selected})
  }

  render(){
    const filteredData = this.getFilteredData()

    const peopleOnOnePage = 50
    const displayData = _.chunk(filteredData, peopleOnOnePage)[this.state.currentPage]

    if(!this.state.chosenCount) {
        return <ChooseCount modeHandler={this.modeHandler} />
    }

    return  this.state.loading ?
      (
        <Loader /> 
      ) : 
      (
        <div className="container">
          <Search submitHandler={this.handleSearch} />
          <Table 
            data={displayData} 
            sortHandler={this.sortHandler}
            showInfo={this.showInfo}
          />
          { this.state.data.length > peopleOnOnePage ? <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredData.length/peopleOnOnePage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination move-pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          /> : null}
          {this.state.detailedRow ? <PersonInfo person={this.state.detailedRow} /> : null }
        </div>
      )
  }
}