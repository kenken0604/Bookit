import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client' //*next-auth/react第四版適用

import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)

    const result = await signIn('credentials', {
      redirect: false, //*登入失敗也不重新導向
      email,
      password,
    })

    setLoading(false)

    if (result.error) {
      toast.error(result.error) //登入失敗結果
    } else {
      router.push('/') //成功登入就導向首頁
    }
  }

  return (
    <div>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-11 col-sm-10 col-md-6 col-xl-5">
            <form className="shadow" onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link href="/password/forgot">
                  <a className="float-right mb-4">Forgot Password?</a>
                </Link>
              </div>
              <button className="btn btn-block py-2">
                {loading ? <ButtonLoader /> : 'LOGIN'}
              </button>
              <Link href="/register">
                <a className="float-right mb-3">New User?</a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
