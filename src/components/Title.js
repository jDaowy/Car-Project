import React from "react";
import "./Title.css";

const Title = () => {
  return (
    <div className="title-container">
      <pre>
        {`
        ___________________________    _________                  ________             ________           _____ 
        ______  /__  __ \\( )_  ___/    __  ____/_____ ________    ___  __ \\__________________(_)____________  /_
        ___ _  /__  / / /|/_____ \\     _  /    _  __ \`/_  ___/    __  /_/ /_  ___/  __ \\____  /_  _ \\  ___/  __/
        / /_/ / _  /_/ /   ____/ /     / /___  / /_/ /_  /        _  ____/_  /   / /_/ /___  / /  __/ /__ / /_  
        \\____/  /_____/    /____/      \\____/  \\__,_/ /_/         /_/     /_/    \\____/___  /  \\___/\\___/ \\__/  
                                                                                       /___/                    
        `}
      </pre>
    </div>
  );
};

export default Title;
