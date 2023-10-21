const priorityDecoderFunc = (priorityString) => {
    let prioriNumber;
    console.log(priorityString);
    switch (priorityString) {
        case "No priority":
            prioriNumber = 0;
            break;
        case "Low":
            prioriNumber = 4;
            break;
        case "Medium":
            prioriNumber = 3;
            break;
        case "High":
            prioriNumber = 2;
            break;
        case "Urgent":
            prioriNumber = 1;
            break;
    }
    return prioriNumber;
};

export default priorityDecoderFunc;