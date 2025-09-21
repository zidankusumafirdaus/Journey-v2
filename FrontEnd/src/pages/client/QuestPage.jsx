import React from "react"; 
import Sidebar from "../../components/layout/Slidebar"; 
import QuestHeader from "../../components/quest/QuestHeader"; 
import QuestList from "../../components/quest/QuestList"; 

const QuestPage = () => { 
  return ( 
    <section 
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-12 sm:py-16 
                 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100" 
    > 
      {/* Sidebar */} 
      <Sidebar /> 

      <QuestHeader /> 
      <QuestList />  
    </section> 
  ); 
}; 

export default QuestPage;