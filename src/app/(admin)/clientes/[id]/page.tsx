
import React from 'react'

export function async () {
    
}
interface ClienteProps {
    params: { id: string }
}

const EditCliente = ({ params }: ClienteProps) => {


    return (
        <div>
        {params.id}
        </div>
    )
}
export default EditCliente