import Page from "./users/Page"

function App() {

  const currentDate = new Date();

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  
  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  
  console.log(formattedDateTime);
  
  return (
    <>
      <Page />
    </>
  )
}

export default App
