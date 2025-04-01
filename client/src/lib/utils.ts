export const dataGridClassNames = (isDarkMode: boolean) => {
    return `
        border ${isDarkMode ? "border-stroke-dark bg-black text-white !important" : "border-gray-200 bg-white"}
        shadow
    `;
};

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
        "& .MuiDataGrid-columnHeaders": {
            color: `${isDarkMode ? "#e5e7eb" : "#000" }`,
            '& [role = "row"] > *' : {
                backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
                borderColor: `${isDarkMode ? "#2d3135" : ""}`,
            },
        },
        "& .MuiIconbutton-root": {
            color: `${isDarkMode ? "#a3a3a3" : "#000"}`,
        },
        "& .MuiTablePagination-root": {
            color: `${isDarkMode ? "#a3a3a3" : "#000"}`,
        },
        "& .MuiTablePagination-selectIcon": {
            color: `${isDarkMode ? "#a3a3a3" : "#000"}`,
        },
        "& .MuiButtonBase-root": {
            color: `${isDarkMode ? "#a3a3a3" : "#000"}`,
        },
        "& .MuiDataGrid-cell": {
            border: "none",
            color: isDarkMode ? "#fff !important" : "#000",
        },
        "& .MuiDataGrid-row": {
            borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
        },
        "& .MuiDataGrid-withBorderColor": {
            borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
        },
        "& .MuiDataGrid-selectedRowCount": {
            color: `${isDarkMode ? "#a3a3a3" : "#000"}`,
        }
    }
}