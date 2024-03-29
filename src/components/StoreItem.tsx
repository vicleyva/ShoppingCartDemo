import React from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import formatCurrency from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
        <Card className='h-100'>
            <Card.Img
                variant='top'
                src={imgUrl}
                height="200px"
                style={{
                    objectFit: "cover"
                }}
            />
            <CardBody className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ?
                        (
                            <Button onClick={() => increaseCartQuantity(id)} className='w-100'>
                                + Add To Cart
                            </Button>
                        )
                        :
                        <div
                            className='d-flex align-itmes-center flex-column'
                            style={{
                                gap: ".5rem"
                            }}
                        >
                            <div
                                className='d-flex align-items-center justify-content-center'
                                style={{
                                    gap: ".5rem"
                                }}
                            >
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className='fs-3'>
                                        {quantity}
                                    </span>
                                    &nbsp;in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button variant='danger' size='sm' onClick={() => removeFromCart(id)}>
                                Remove
                            </Button>
                        </div>}
                </div>
            </CardBody>

        </Card>
    )
}
