import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, DollarSign, PieChart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar } from "recharts";

const Reports = () => {
  const [period, setPeriod] = useState("6months");
  
  // Dados simulados para relatórios
  const monthlyTrends = [
    { month: "Jan", amount: 156, subscriptions: 3 },
    { month: "Fev", amount: 178, subscriptions: 4 },
    { month: "Mar", amount: 165, subscriptions: 3 },
    { month: "Abr", amount: 189, subscriptions: 5 },
    { month: "Mai", amount: 167, subscriptions: 4 },
    { month: "Jun", amount: 157, subscriptions: 3 }
  ];

  const categorySpending = [
    { name: "Streaming", value: 67.80, percentage: 43, color: "hsl(var(--primary))" },
    { name: "Software", value: 89.90, percentage: 57, color: "hsl(var(--success))" }
  ];

  const upcomingPayments = [
    { service: "Netflix", amount: 45.90, date: "2024-08-15", days: 5 },
    { service: "Spotify", amount: 21.90, date: "2024-08-10", days: 10 },
    { service: "Adobe CC", amount: 89.90, date: "2024-08-20", days: 15 }
  ];

  const insights = [
    {
      type: "warning",
      title: "Gasto aumentou 12%",
      description: "Comparado ao mês passado",
      value: "+R$ 18,90"
    },
    {
      type: "success", 
      title: "Economia possível",
      description: "Cancelando serviços não usados",
      value: "R$ 45,90"
    },
    {
      type: "info",
      title: "Próximo pagamento alto",
      description: "Adobe CC em 15 dias",
      value: "R$ 89,90"
    }
  ];

  const currentMonthTotal = 157.70;
  const previousMonthTotal = 167.00;
  const percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Relatórios
            </h1>
            <p className="text-muted-foreground">
              Análise detalhada dos seus gastos com assinaturas
            </p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 meses</SelectItem>
              <SelectItem value="6months">6 meses</SelectItem>
              <SelectItem value="12months">12 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gasto Total</p>
                <p className="text-2xl font-bold text-foreground">R$ {currentMonthTotal.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {percentageChange < 0 ? (
                    <TrendingDown className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm ${percentageChange < 0 ? 'text-success' : 'text-destructive'}`}>
                    {Math.abs(percentageChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Média Mensal</p>
                <p className="text-2xl font-bold text-foreground">R$ 168,50</p>
                <p className="text-sm text-muted-foreground mt-1">Últimos 6 meses</p>
              </div>
              <Calendar className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Economia Potencial</p>
                <p className="text-2xl font-bold text-foreground">R$ 45,90</p>
                <p className="text-sm text-muted-foreground mt-1">Serviços não usados</p>
              </div>
              <PieChart className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tendência Mensal */}
          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Tendência de Gastos</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Gastos por Categoria */}
          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Gastos por Categoria</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={categorySpending} cx="50%" cy="50%" outerRadius={80}>
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categorySpending.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-foreground">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">R$ {category.value.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Insights e Próximos Pagamentos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insights */}
          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-4">Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Badge 
                    variant={insight.type === 'success' ? 'default' : insight.type === 'warning' ? 'destructive' : 'secondary'}
                    className="mt-0.5"
                  >
                    {insight.type === 'success' ? '✓' : insight.type === 'warning' ? '⚠' : 'ℹ'}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{insight.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Próximos Pagamentos */}
          <Card className="bg-gradient-card shadow-card p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-4">Próximos Pagamentos</h3>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">{payment.service}</p>
                    <p className="text-sm text-muted-foreground">Em {payment.days} dias</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">R$ {payment.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;