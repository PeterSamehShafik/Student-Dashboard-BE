

export const paginate = (page, size) => {
    try {
        if(!page || page <= 0)
        {
            page = 1;
        }
        if(!size || size <= 0)
        {
            size = 5;
        }
        const skip = (page - 1) * size;
        return { limit: size, skip }
    } catch (error) {
        return res.status(400).json({message: "catch error"})
    }
}