module.exports = {
    age: function(timestamp) {
            const today = new Date()
            const birthDate = new Date(timestamp)
        
            let age = today.getFullYear() - birthDate.getFullYear()
            const month = today.getMonth() - birthDate.getMonth()
        
            if (month < 0 || 
                month == 0 && 
                today.getDate() <= birthDate.getDate()) {
                age = age - 1
            }
        
            return age
    },
    date: function(timestamp) {
            const date = new Date(timestamp)
            
            // Year
            const year = date.getFullYear()
            // Month
            const month = date.getMonth() + 1
            // Day
            const day = date.getDate()

            console.log(`${year}-${month}-${day}`)
    }
}