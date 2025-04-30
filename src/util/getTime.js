function formatTimeToHHMM(date) {
    const [datePart, timePart,part] = date.split(' ');
    const [hours, minutes] = timePart.split(':');
    return `${hours[0]=='0' ? hours.substring(1):hours}:${minutes} ${part}`;

}

export default formatTimeToHHMM;