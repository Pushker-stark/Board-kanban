const priorityDecoderFunc = (priorityString) => {
    let prioriNumber;
    console.log(priorityString);
    switch (priorityString) {
        case "No priority":
            prioriNumber = 0;
            break;
        case "Low":
            prioriNumber = 1;
            break;
        case "Medium":
            prioriNumber = 2;
            break;
        case "High":
            prioriNumber = 3;
            break;
        case "Urgent":
            prioriNumber = 4;
            break;
    }
    return prioriNumber;
};

export default priorityDecoderFunc;