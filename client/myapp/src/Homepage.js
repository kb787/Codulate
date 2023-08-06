import { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';

const Homepage = () => {
  const [code, setCode] = useState('');
  const [selectedValueLanguage, setSelectedValueLanguage] = useState('');
  const [selectedFileOption, setSelectedFileOption] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeSubmit = async () => {
    try {
      
      const response = await axios.post(
        "http://localhost:3500/v1/api/users/postCodeRequest",
         {
           code:code ,
           selectedValueLanguage:selectedValueLanguage
         }   
      );
      console.log(response.data);
      const { output, success } = response.data;

      if (success) {
        setOutput(output);
      } else {
        message.error("Server-side error occurred");
      }
    } catch (error) {
      message.error("Failed to send the request");
    }
  };

  return (
    <div className="Homepage">
      <header className="homepageHeader">
        <ul className="headerGroups">
          <li className="headerHeading">
            Online IDE
          </li>
          <li className="headerList">
            <select className="listItem" aria-label="Default select example" value={selectedFileOption} onChange={(e) => setSelectedFileOption(e.target.value)}>
              <option selected="">Files</option>
              <option value={1}>New File</option>
              <option value={2}>Download</option>
            </select>
          </li>
          <li className="headerList">
          <div className="headerListItem">
          <ul className = "labelSet"> 
          <li>
          <label htmlFor="exampleFormControlInput1" className="listItemLabel">
          Enter programming language
          </label>
          </li>
          <li>
          <input
          type = "text"
          className="listItemInput"
          placeholder="C++/C/Java/Javascript/Python"
          value = {selectedValueLanguage}
          onChange = {(e) => setSelectedValueLanguage(e.target.value)}
          />
          </li>
           </ul>
  </div>  
          </li>
          <li>
            <div className="buttons">
              <button type="button" className="headerButton" onClick={handleCodeSubmit}>
                Run
              </button>
            </div>
          </li>
        </ul>
      </header>
      <main className="headerMain">
        <div>
          <textarea
            type = "text"
            className="textArea1"
            id="exampleFormControlTextarea1"
            placeholder="Enter your code here"
            value={code} 
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="textArea2"
            id="exampleFormControlTextarea1"
            placeholder="Your output will be displayed here"
            value={output}
            readOnly
          />
        </div>
      </main>
    </div>
  );
};

export default Homepage;




