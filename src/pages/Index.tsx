import { BreathingCircle } from "@/components/BreathingCircle";

const Index = () => {
  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 p-6 backdrop-blur-sm">
        <h1 className="text-2xl font-light tracking-tight text-foreground">breathe</h1>
      </header>
      <BreathingCircle />
    </main>
  );
};

export default Index;
