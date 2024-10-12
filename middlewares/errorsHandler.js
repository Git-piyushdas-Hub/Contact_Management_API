import constants from "../constants.js";

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode
    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json(
                {title:"Validation error",
                    message: err.message, 
                    stackTrace: err.stack
                })
            break;
        case constants.UNAUTHORIZED:
            res.json(
                {title:"User not authorized",
                    message: err.message, 
                    stackTrace: err.stack
                })
            break 
        case constants.FORBIDDEN:
            res.json(
                {title:"Forbidden resource accessed",
                    message: err.message, 
                    stackTrace: err.stack
                })
            break
        case constants.NOT_FOUND:
            res.json(
                {title:"Not found the resource",
                    message: err.message, 
                    stackTrace: err.stack
                })
            break 
        case constants.SERVER_ERR:
            res.json(
                {title:"Server error",
                    message: err.message, 
                    stackTrace: err.stack
                })
            break 
        default:
            console.log("No error, All good!"); 
            break;
    }

}

export default errorHandler