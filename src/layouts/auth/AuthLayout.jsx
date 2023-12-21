import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Assets from '../../constants/images'

const AuthLayout = ({ children }) => {
    return (
        <div className='auth-layout'>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={6} className='d-none d-lg-block'>
                        <div className='left-wrapper'>
                            <h1 className='mb-4'>Discover your next favorite read with our app.</h1>
                            <h5>Keep track of your reading, goals & progress</h5>

                            <div className="img-wrapper mt-5">
                                <img className='w-100' src={Assets.AuthBgImg} alt="" />
                            </div>
                        </div>
                    </Col>

                    <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 0 }} lg={{ span: 5, offset: 1 }} >
                        <div className='right-wrapper'>
                            <div className="logo mb-4">
                                <img src={Assets.LogoImg} alt="" />
                            </div>

                            <div className='form-wrapper mt-4'>
                                {children}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AuthLayout