import React from "react";

const LocationSearchPanel = ({ suggestions = [], onSuggestionSelect }) => {
  // Ensure suggestions is an array
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];
  // //console.log(safeSuggestions);
  return (
    <>
      {safeSuggestions.map((suggestion, index) => (
        <div
          onClick={() => onSuggestionSelect(suggestion.description)}
          key={index}
          className="flex flex-row items-center justify-start w-full py-2 cursor-pointer hover:bg-gray-100"
        >
          <div
            style={{
              backgroundColor: "#eee",
              width: "40px",
              height: "40px",
              marginRight: "18px",
            }}
            className="bg-[#eee] h-10 w-10 ml-2.5 rounded-full flex items-center justify-center"
          >
            <i className="ri-map-pin-fill"></i>
          </div>
          <h4
            style={{
              paddingRight: "10px",
              width: "80%",
            }}
            className="text-lg p-2"
          >
            {suggestion.description}
          </h4>
        </div>
      ))}
      {safeSuggestions.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          Type to search locations...
        </div>
      )}
    </>
  );
};

export default LocationSearchPanel;
