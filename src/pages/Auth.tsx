import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect if user is logged in
        if (session?.user) {
          navigate("/");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validatePassword = (pwd: string): { valid: boolean; message: string } => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    if (!hasUppercase) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!hasLowercase) {
      return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!hasNumber) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    if (!hasSymbol) {
      return { valid: false, message: "Password must contain at least one symbol" };
    }

    return { valid: true, message: "" };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!username || !firstName || !lastName || !signupEmail || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast({
        title: "Weak password",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            user_id: authData.user.id,
            username,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: signupEmail,
          });

        if (profileError) throw profileError;

        toast({
          title: "Account created!",
          description: "Welcome to EAT EASY!",
        });

        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-2xl p-8 shadow-glow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            EAT EASY
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back! Please login to continue." : "Create your account to get started"}
          </p>
        </div>

        {isLogin ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email or Phone Number</Label>
              <Input
                id="login-email"
                type="text"
                placeholder="Enter your email or phone number"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading} variant="hero">
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(false)}
                className="text-primary"
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email *</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Must contain uppercase, lowercase, number, and symbol
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password *</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading} variant="hero">
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(true)}
                className="text-primary"
              >
                Already have an account? Login
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Auth;
