import { ArrowRight, Mail, Sparkles, User, Lock, Phone } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
// @ts-ignore
import client from '../../api/client'

export function RegisterPage() {
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) // 1: Details, 2: OTP
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    role: 'Dealer', // Default
    otp: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRequestOTP = async () => {
    setError('')
    setLoading(true)
    try {
      await client.post('/auth/register-init/', { email: formData.email })
      setStep(2)
      setSuccess('OTP sent successfully to your email.')
    } catch (err: any) {
      setError(err.response?.data?.email?.[0] || 'Failed to send OTP. Please check your email or try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setError('')
    setLoading(true)
    try {
      await client.post('/auth/register-verify/', formData)
      setSuccess('Registration successful! Your account is pending admin approval.')
      setStep(3) // Success step
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Registration failed. Please check your details and OTP.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#f8fbf9_0%,_#eef4f1_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl flex-1">
          <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Join the CCS Connect Network
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Create an Account
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Register as a Dealer, Distributor, or Employee. Access will be granted after administrator approval.
          </p>
        </div>

        <Card className="w-full max-w-lg rounded-[2rem] border border-slate-200/70 bg-white/85 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">Registration</p>
              <p className="text-sm text-slate-600">
                {step === 1 && 'Step 1: Account Details'}
                {step === 2 && 'Step 2: Email Verification'}
                {step === 3 && 'Account Created'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}
            
            {success && step === 2 && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            {step === 1 && (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                  >
                    <option value="Dealer">Dealer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Employee">Employee</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <User className="h-4 w-4 text-slate-500" />
                      <input 
                        name="username"
                        type="text" 
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe" 
                        className="w-full bg-transparent outline-none" 
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <input 
                        name="phone"
                        type="text" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890" 
                        className="w-full bg-transparent outline-none" 
                      />
                    </div>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Work email</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com" 
                      className="w-full bg-transparent outline-none" 
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Lock className="h-4 w-4 text-slate-500" />
                    <input 
                      name="password"
                      type="password" 
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full bg-transparent outline-none" 
                    />
                  </div>
                </label>
                
                <Button
                  className="w-full mt-2"
                  size="lg"
                  disabled={loading}
                  onClick={handleRequestOTP}
                >
                  {loading ? 'Sending OTP...' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Enter OTP</span>
                  <p className="text-xs text-slate-500 mb-2">We sent a 6-digit code to {formData.email}</p>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <input 
                      name="otp"
                      type="text" 
                      maxLength={6}
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="000000" 
                      className="w-full bg-transparent outline-none text-center tracking-widest text-lg font-semibold" 
                    />
                  </div>
                </label>
                
                <Button
                  className="w-full mt-2"
                  size="lg"
                  disabled={loading || formData.otp.length !== 6}
                  onClick={handleRegister}
                >
                  {loading ? 'Verifying...' : 'Verify & Register'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center mt-2">
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-900 transition">
                    Go Back
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Registration Complete!</h3>
                <p className="text-slate-600 mb-6">{success}</p>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </Button>
              </div>
            )}

            {step !== 3 && (
              <div className="flex items-center justify-center text-sm text-slate-500 mt-4 border-t border-slate-100 pt-4">
                <span className="mr-2">Already have an account?</span>
                <Link to="/login" className="transition hover:text-slate-900 font-medium">Sign in</Link>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
