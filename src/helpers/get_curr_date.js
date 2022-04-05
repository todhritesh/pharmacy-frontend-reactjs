export default function get_curr_date(){   
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2,'0');
    const year = String(today.getFullYear()).padStart(2,'0');
    const curr_date = `${year}-${month}-${day}`;
    return curr_date
}