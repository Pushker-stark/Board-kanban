

- Urgent (Priority level 4)
- High (Priority level 3)
- Medium (Priority level 2)
- Low (Priority level 1)
- No priority (Priority level 0)


const priorityDecoderFunc=(priorityNumber)=>{
    let prioriName
    switch(priorityNumber)
    {
        case 0:
            prioriName= 'No priority';
        case 1:
            prioriName= 'Low';
        case 2:
            prioriName= 'Medium';
        case 3:
            prioriName= 'High';
        case 4:
            prioriName= 'Urgent';
            default:
                prioriName= 'No priority';
                

    }
    return prioriName
}