import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react' //*next-auth/client不適用

import { toast } from 'react-toastify'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false, //*登入失敗也不重新導向
      email,
      password,
    })

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
          <div className="col-10 col-lg-5">
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
              </div>
              <Link href="#">
                <a className="float-right mb-4">Forgot Password?</a>
              </Link>
              <button className="btn btn-block py-3">LOGIN</button>
              <Link href="#">
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
