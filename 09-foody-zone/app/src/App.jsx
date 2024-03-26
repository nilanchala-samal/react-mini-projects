import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      try {

        const response = await fetch(BASE_URL);
        const data = await response.json();
        setData(data)
        setFilteredData(data)
        setloading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
    }
    fetchFoodData()
  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filter)
  }

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data)
      setSelectedBtn("all")
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    )
    setFilteredData(filter)
    setSelectedBtn(type)
  }

  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    },
  ]

  if (error) return <div>{error}</div>
  if (loading) return <div>loading...</div>

  return (<>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>

        <div className='search'>
          <input onChange={searchFood} type="text" placeholder='Search Food' />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((btn) =>
          <Button
            isselected={selectedBtn === btn.type}
            key={btn.name}
            onClick={() => filteredFood(btn.type)}
          >
            {btn.name}
          </Button>)}
      </FilterContainer>


    </Container>
    <SearchResult data={filteredData} />
  </>)
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: #9a9797;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap:12px;
padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({isselected}) => isselected ? "hsl(0, 100%, 46%)" : "hsl(0, 100%, 63%)"};
  outline: ${({isselected}) => isselected ? "1px solid white" : null};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover{
    background-color: hsl(0, 100%, 43%);
  }
`;

