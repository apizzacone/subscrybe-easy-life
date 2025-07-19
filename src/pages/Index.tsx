import { useState, useEffect } from "react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { StatsCard } from "@/components/StatsCard";
import { NextPaymentCard } from "@/components/NextPaymentCard";
import { AddSubscriptionDialog } from "@/components/AddSubscriptionDialog";
import { SpendingChart } from "@/components/SpendingChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Search,
  Bell,
  Settings,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  nextPayment: string;
  category: string;
  status: 'active' | 'canceled' | 'trial';
}

const Index = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      name: 'Netflix',
      price: 45.90,
      currency: 'BRL',
      nextPayment: '2024-08-15',
      category: 'Streaming',
      status: 'active'
    },
    {
      id: '2',
      name: 'Spotify',
      price: 21.90,
      currency: 'BRL',
      nextPayment: '2024-08-10',
      category: 'Música',
      status: 'active'
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      price: 89.90,
      currency: 'BRL',
      nextPayment: '2024-08-20',
      category: 'Software',
      status: 'trial'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const addSubscription = (newSubscription: Subscription) => {
    setSubscriptions(prev => [...prev, newSubscription]);
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    toast({
      title: "Assinatura removida",
      description: "A assinatura foi removida com sucesso.",
    });
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cálculos para estatísticas
  const totalMonthly = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.price, 0);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;

  const nextPayments = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => ({
      ...sub,
      daysUntil: Math.ceil((new Date(sub.nextPayment).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);

  // Dados para gráficos
  const monthlyData = [
    { month: 'Jan', amount: 156 },
    { month: 'Fev', amount: 178 },
    { month: 'Mar', amount: 165 },
    { month: 'Abr', amount: 189 },
    { month: 'Mai', amount: 167 },
    { month: 'Jun', amount: totalMonthly }
  ];

  const categoryData = subscriptions.reduce((acc, sub) => {
    const existing = acc.find(item => item.name === sub.category);
    if (existing) {
      existing.value += sub.price;
    } else {
      acc.push({ name: sub.category, value: sub.price, color: '' });
    }
    return acc;
  }, [] as Array<{ name: string; value: number; color: string }>);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Minhas Assinaturas
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus serviços e controle seus gastos
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Lembretes
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Config
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Gasto Mensal"
            value={`R$ ${totalMonthly.toFixed(2)}`}
            subtitle="Total ativo"
            icon={DollarSign}
            gradient="primary"
          />
          <StatsCard
            title="Assinaturas Ativas"
            value={activeSubscriptions.toString()}
            subtitle="Serviços ativos"
            icon={CreditCard}
            gradient="success"
          />
          <StatsCard
            title="Próximo Pagamento"
            value={nextPayments[0] ? `${nextPayments[0].daysUntil} dias` : 'N/A'}
            subtitle={nextPayments[0]?.name || 'Nenhum próximo'}
            icon={Calendar}
            gradient="warning"
          />
          <StatsCard
            title="Economia Potencial"
            value="R$ 45,90"
            subtitle="Vs mês anterior"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
            gradient="success"
          />
        </div>

        {/* Próximos Pagamentos */}
        <Card className="bg-gradient-card shadow-card mb-8 animate-slide-up">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Próximos Pagamentos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextPayments.map((payment) => (
                <NextPaymentCard
                  key={payment.id}
                  subscriptionName={payment.name}
                  amount={payment.price}
                  currency={payment.currency}
                  date={payment.nextPayment}
                  daysUntil={payment.daysUntil}
                  priority={payment.daysUntil <= 3 ? 'high' : payment.daysUntil <= 7 ? 'medium' : 'low'}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Gráficos */}
        <div className="mb-8">
          <SpendingChart 
            monthlyData={monthlyData}
            categoryData={categoryData}
          />
        </div>

        {/* Lista de Assinaturas */}
        <Card className="bg-gradient-card shadow-card animate-slide-up">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">
                Todas as Assinaturas
              </h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar assinatura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <AddSubscriptionDialog onAdd={addSubscription} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  {...subscription}
                  onDelete={deleteSubscription}
                  onEdit={(id) => toast({
                    title: "Em desenvolvimento",
                    description: "Funcionalidade de edição em breve!",
                  })}
                  onSetReminder={(id) => toast({
                    title: "Lembrete configurado",
                    description: "Você receberá uma notificação antes do vencimento.",
                  })}
                />
              ))}
            </div>

            {filteredSubscriptions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  {searchTerm ? 'Nenhuma assinatura encontrada' : 'Nenhuma assinatura cadastrada'}
                </div>
                {!searchTerm && <AddSubscriptionDialog onAdd={addSubscription} />}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
