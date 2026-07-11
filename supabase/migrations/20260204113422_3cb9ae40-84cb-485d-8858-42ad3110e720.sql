-- Create projects table for portfolio
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_link TEXT,
  live_link TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for contact form
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public can read projects (portfolio is public)
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Anyone can insert messages (contact form)
CREATE POLICY "Anyone can send messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, tech_stack, github_link, featured, display_order) VALUES
('E-Commerce Platform', 'A full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.', ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'], 'https://github.com/rajabanerjee', true, 1),
('Task Management App', 'A collaborative task management tool with real-time updates, team features, and intuitive drag-and-drop interface.', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], 'https://github.com/rajabanerjee', true, 2),
('Weather Dashboard', 'A responsive weather application that displays current conditions and forecasts using external weather APIs.', ARRAY['React', 'Python', 'REST API', 'Chart.js'], 'https://github.com/rajabanerjee', false, 3),
('Portfolio Website', 'A modern, responsive portfolio website built with React and featuring smooth animations and 3D effects.', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], 'https://github.com/rajabanerjee', true, 4);