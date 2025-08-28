import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";



const ThemeContext = createContext(null)

export const ThemeContextProvider = ({ children }) => {
    
    const [theme, setTheme] = useState(() => {
        const theme = localStorage.getItem("theme")
       return theme? JSON.parse(theme): "light"
    })
    
    const toggleTheme = () => {
        setTheme(prev=>prev==="light"? "dark":"light")
    }


    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme))
        document.body.className = theme
    },[theme])

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (context === null) {
        throw new Error('Обгорніть')
    }
    else return context
}


